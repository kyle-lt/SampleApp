package com.appdynamics.sample.resource;

import com.appdynamics.sample.model.Product;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by alanaanderson on 6/22/16.
 */
@Path("/exceptions")
public class RESTExceptions {

    @Inject
    protected EntityManager manager;

    @GET
    public Response throwException() throws Exception {

        try {
            throw new Exception("Forced Exception");
        } catch (Exception e) {
            // Ignore the Exception
        }
        return Response.serverError().build();
    }

    @GET
    @Path("/slowrequest")
    public Response slowRequest(@PathParam(value="delay") int delay) throws Exception {
        for (int x = 0; x < delay; ++x) Thread.sleep(1000);
        return Response.ok().build();
    }

    @GET
    @Path("/sqlexception")
    public Response throwSqlException() throws Exception {
        manager.createQuery("INSERT INTO non_existant_table (wrong_column) VALUES (1)").getResultList();
        return Response.serverError().build();
    }
}
