package com.hackumass.ListBuddy.QuickMongoDBExample;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.List;

import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class QuickExample {
    public class Movie {
        String plot;
        List<String> genres;
        String title;

        public String getPlot() {
            return plot;
        }
        public void setPlot(String plot) {
            this.plot = plot;
        }
        public List<String> getGenres() {
            return genres;
        }
        public void setGenres(List<String> genres) {
            this.genres = genres;
        }
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        @Override
        public String toString() {
            return "Movie [\n  plot=" + plot + ",\n  genres=" + genres + ",\n  title=" + title + "\n]";
        }
    }

    public static void main(String[] args) {
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://jsanchezroa:DgUYI9KVHbCdrrsc@listbuddy-test.aj5m5.mongodb.net/?retryWrites=true&w=majority&appName=ListBuddy-Test";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix").withCodecRegistry(pojoCodecRegistry);
            MongoCollection<Movie> collection = database.getCollection("movies", Movie.class);
            Movie movie = collection.find(eq("title", "Back to the Future")).first();
            System.out.println(movie);
        }
    }
}
