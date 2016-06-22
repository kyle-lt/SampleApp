package com.appdynamics.sample.resource;

/**
 * Created by mark.prichard on 6/21/16.
 */

import com.appdynamics.sample.model.Product;

import com.google.inject.persist.Transactional;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.net.URI;

import static javax.ws.rs.core.MediaType.*;

@Path("/products")
public class ProductResource extends ResourceCollection<Product> {
    public ProductResource() {
        super(Product.class);
    }

    @PUT
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    @Path("{id}")
    @Transactional
    public Product update(@PathParam("id") int id, Product src) {
        Product product = get(id);
        product.setId(id);
        product.setName(src.getName());
        product.setStock(src.getStock());
        return manager.find(Product.class, id);
    }

    @POST
    @Consumes(APPLICATION_JSON)
    @Transactional
    public Response create(Product product) {
        manager.persist(product);
        return Response.created(URI.create(product.getId()+"")).build();
    }
}
