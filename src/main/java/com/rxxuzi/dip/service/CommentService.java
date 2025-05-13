package com.rxxuzi.dip.service;

import com.rxxuzi.dip.model.Comment;
import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * <h1>CommentService</h1>
 * Service class that handles business logic for comments.
 * Provides methods to create, read, and delete comments.
 *
 * @see Comment
 * @see CommentRepo
 * @author rxx
 */
@Service
public class CommentService {

    private final CommentRepo commentRepository;

    @Autowired
    public CommentService(CommentRepo commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPost(Post post) {
        return commentRepository.findByPostOrderByCreatedAtAsc(post);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}