package com.rxxuzi.dip.controller;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * <h1>SearchCtrl</h1>
 * Controller class that handles search functionality for the web interface.
 * Processes search requests and displays search results to users.
 *
 * @see PostService
 * @see Post
 * @author rxx
 */
@Controller
public class SearchCtrl {

    private final PostService postService;

    @Autowired
    public SearchCtrl(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/search")
    public String search(@RequestParam(required = false) String keyword, Model model) {
        List<Post> searchResults = postService.searchPosts(keyword);
        model.addAttribute("keyword", keyword);
        model.addAttribute("posts", searchResults);
        model.addAttribute("resultCount", searchResults.size());
        return "search";
    }
}