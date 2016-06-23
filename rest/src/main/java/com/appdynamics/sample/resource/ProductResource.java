/*
 *  Copyright 2016 AppDynamics, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not
 *  use this file except in compliance with the License.
 *
 *  A copy of the License is located at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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


//    HELLO THIS IS A CHANGE
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
