package com.appdynamics.sample;

import com.appdynamics.sample.model.Product;
import com.appdynamics.sample.resource.ProductResource;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.persist.PersistFilter;
import com.google.inject.persist.jpa.JpaPersistModule;
import com.google.inject.servlet.GuiceServletContextListener;
import com.sun.jersey.guice.JerseyServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;

import java.util.Collections;
import java.util.Map;

/**
 * Created by mark.prichard on 6/21/16.
 */

public class SampleApp extends GuiceServletContextListener {

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(
                new JpaPersistModule("product"),
                new JerseyServletModule() {
                    protected void configureServlets() {
                        bind(ProductResource.class);

                        filter("/*").through(PersistFilter.class);
                        serve("/*").with(GuiceContainer.class,POJO_JSON_MAPPING);
                    }
                }
        );
    }

    private static final Map<String,String> POJO_JSON_MAPPING = Collections.singletonMap(
            "com.sun.jersey.api.json.POJOMappingFeature", "true"
    );
}