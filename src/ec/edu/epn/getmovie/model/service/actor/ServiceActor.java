package ec.edu.epn.getmovie.model.service.actor;
import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import ec.edu.epn.getmovie.model.Actor;

@Path("actor")
@Produces("application/json")
public class ServiceActor {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
	@GET
	@Path("buscar")
	@Consumes("application/json")
	public Actor buscarActor(@QueryParam("id")int idActor) {
		String mensaje="";
		Actor actor = new Actor();
		try{
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			actor = em.find(Actor.class, idActor);
			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje="Usuario encontrado";
		}catch(Exception e){
			e.printStackTrace();
			mensaje="error buscando";
		}
		return actor;
	}
	@POST
	@Path("crear")
	@Consumes("application/json")
	public void crearActor(Actor a) {
		try{
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			em.persist(a);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
	@Consumes("application/json")
	public Collection<Actor> listarActor(@QueryParam("nombre")String nombreActor) {
		EntityManager em = emf.createEntityManager();
		Query q = em.createNamedQuery("Actor.findByNombre");
		q.setParameter("nombre", "%" + nombreActor + "%");
		Collection<Actor> listaActor = q.getResultList();
		em.close();	
		return listaActor;
	}
	@DELETE
	@Path("eliminar")
	@Consumes("application/json")
	public void eliminarActor(@QueryParam("id")int idActor) {
		try{
			EntityManager em = emf.createEntityManager();
			Actor actor = em.find(Actor.class, idActor);
			em.getTransaction().begin();
			em.remove(actor);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@PUT
	@Path("modificar")
	@Consumes("application/json")
	public void modificarActor(Actor a){
		try{
			EntityManager em = emf.createEntityManager();
			Actor actorGet = em.find(Actor.class, a.getIdactor());
			em.getTransaction().begin();
			actorGet.setNombreactor(a.getNombreactor());
			actorGet.setGenero(a.getGenero());
			actorGet.setOscars(a.getOscars());
			actorGet.setNacimiento(a.getNacimiento());
			actorGet.setFotoactor(a.getFotoactor());
			em.getTransaction().commit();
			em.close();
			emf.close();
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
}
