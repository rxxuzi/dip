package com.rxxuzi.dip.controller;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.model.User;
import com.rxxuzi.dip.service.PostService;
import com.rxxuzi.dip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * <h1>PostCtrl</h1>
 * Controller class that handles post-related web requests.
 * Manages post listing, creation, and detailed view operations.
 *
 * @see PostService
 * @see UserService
 * @see Post
 * @author rxx
 */
@Controller
public class PostCtrl {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostCtrl(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    // 投稿一覧ページ
    @GetMapping("/posts")
    public String listPosts(Model model) {
        List<Post> posts = postService.getAllPosts();
        model.addAttribute("posts", posts);
        return "posts/list";
    }

    // 新規投稿ページ
    @GetMapping("/new")
    public String newPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "posts/new";
    }

    // 投稿の保存処理
    @PostMapping("/new")
    public String createPost(@ModelAttribute Post post, @RequestParam String username, RedirectAttributes redirectAttributes) {
        User user = userService.findByUsername(username);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setPassword("default");
            user.setEmail(username + "@example.com");
            userService.registerUser(user);
        }
        post.setUser(user);
        Post savedPost = postService.createPost(post);

        // 保存した投稿の詳細ページにリダイレクト
        return "redirect:/post/" + savedPost.getId();
    }

    // 投稿詳細ページ
    @GetMapping("/post/{id}")
    public String showPost(@PathVariable Long id, Model model) {
        postService.getPostById(id).ifPresent(post -> {
            model.addAttribute("post", post);
        });
        return "posts/detail";
    }
}