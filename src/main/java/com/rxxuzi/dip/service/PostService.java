package com.rxxuzi.dip.service;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.model.User;
import com.rxxuzi.dip.repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepo postRepository;

    @Autowired
    public PostService(PostRepo postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Post> getPostsByUser(User user) {
        return postRepository.findByUser(user);
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // 検索メソッドを追加
    public List<Post> searchPosts(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return getAllPosts();
        }
        return postRepository.searchByKeyword(keyword);
    }
}