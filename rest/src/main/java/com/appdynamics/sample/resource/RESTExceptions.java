package com.appdynamics.sample.resource;

import com.appdynamics.sample.model.Product;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.List;

/**
 * Created by alanaanderson on 6/22/16.
 */
@Path("/exceptions")
public class RESTExceptions {

    @Inject
    protected EntityManager manager;

    @GET
    public void throwException() throws Exception {
        throw new Exception("Forced Exception");
    }

    @GET
    @Path("/slowrequest")
    public void slowRequest(@PathParam(value="delay") int delay) throws Exception {
        for (int x = 0; x < delay; ++x) Thread.sleep(1000);
    }

    @GET
    @Path("/sqlexception")
    public List<? extends Product> throwSqlException() throws Exception {
        return manager.createQuery("INSERT INTO non_existant_table (wrong_column) VALUES (1)").getResultList();
    }

}
