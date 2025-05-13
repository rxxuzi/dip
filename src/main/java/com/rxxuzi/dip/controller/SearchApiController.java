package com.rxxuzi.dip.controller;

import com.rxxuzi.dip.model.Post;
import com.rxxuzi.dip.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <h1>SearchApiController</h1>
 * REST controller that provides search functionality through API endpoints.
 * Processes search queries and returns matching posts as JSON.
 *
 * @see PostService
 * @see Post
 * @author rxx
 */
@RestController
@RequestMapping("/api/search")
public class SearchApiController {

    private final PostService postService;

    @Autowired
    public SearchApiController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> search(@RequestParam(name = "q", required = false) String keyword) {
        return postService.searchPosts(keyword);
    }
}