package com.rxxuzi.dip.controller;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.model.User;
import com.rxxuzi.dip.service.PostService;
import com.rxxuzi.dip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <h1>PostApiController</h1>
 * REST controller that provides API endpoints for post operations.
 * Handles CRUD operations for posts through REST API.
 *
 * @see PostService
 * @see UserService
 * @see Post
 * @author rxx
 */
@RestController
@RequestMapping("/api/posts")
public class PostApiController {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostApiController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Map<String, String> payload) {
        String title = payload.get("title");
        String content = payload.get("content");
        String username = payload.get("username");

        // バリデーション
        if (title == null || content == null || username == null) {
            return ResponseEntity.badRequest().build();
        }

        // ユーザー取得または作成
        User user = userService.findByUsername(username);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setPassword("default");
            user.setEmail(username + "@example.com");
            userService.registerUser(user);
        }

        // 投稿作成
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);
        Post savedPost = postService.createPost(post);

        return ResponseEntity.ok(savedPost);
    }
}