package com.rxxuzi.dip.controller;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * <h1>HomeCtrl</h1>
 * Controller class for the homepage.
 * Handles rendering the main page with posts and welcome message.
 *
 * @see PostService
 * @see Post
 * @author rxx
 */
@Controller
public class HomeCtrl{

    private final PostService postService;

    @Autowired
    public HomeCtrl(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/")
    public String home(Model model) {
        // 新規投稿用のオブジェクト
        model.addAttribute("post", new Post());
        // 既存の投稿一覧を表示
        List<Post> posts = postService.getAllPosts();
        model.addAttribute("posts", posts);
        return "index";
    }
}