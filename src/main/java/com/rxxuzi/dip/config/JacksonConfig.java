package com.rxxuzi.dip.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * <h1>JacksonConfig</h1>
 * Configuration class for Jackson JSON serialization.
 * Configures ObjectMapper to handle Java 8 date/time types and empty beans.
 *
 * @author rxx
 */
@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

        // Java 8の日付/時間型をサポートするためのモジュールを登録
        mapper.registerModule(new JavaTimeModule());

        // ISO-8601形式で日付をシリアライズするための設定
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        return mapper;
    }
}