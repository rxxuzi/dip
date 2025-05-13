package com.rxxuzi.dip.repository;

import com.rxxuzi.dip.model.Comment;
import com.rxxuzi.dip.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreatedAtAsc(Post post);
}