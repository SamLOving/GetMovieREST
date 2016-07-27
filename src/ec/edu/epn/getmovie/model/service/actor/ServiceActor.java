package ec.edu.epn.getmovie.model.service.actor;
import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
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
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieREST");
	@GET
	@Path("buscar")
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
	public String crearActor(
			@QueryParam("nombre")String nombre,
			@QueryParam("genero")String genero,
			@QueryParam("nacimiento")String nacimiento,
			@QueryParam("oscars")int oscar
			) {
		try{
			EntityManager em = emf.createEntityManager();
			Actor actor = new Actor();
			actor.setNombreactor(nombre);
			actor.setGenero(genero);
			actor.setOscars(oscar);
			actor.setNacimiento(nacimiento);
			em.getTransaction().begin();
			em.persist(actor);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return "Actor creado";
	}
	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
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
	public String eliminarActor(@QueryParam("id")int idActor) {
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
		return "usuario eliminado";
	}
	@PUT
	@Path("modificar")
	public String modificarActor(
			@QueryParam("nombre")String nombre,
			@QueryParam("genero")String genero,
			@QueryParam("nacimiento")String nacimiento,
			@QueryParam("oscars")int oscar,
			@QueryParam("id")int id
			){
		String mensaje="";
		try{
			EntityManager em = emf.createEntityManager();
			Actor actorGet = em.find(Actor.class, id);
			em.getTransaction().begin();
			actorGet.setNombreactor(nombre);
			actorGet.setGenero(genero);
			actorGet.setOscars(oscar);
			actorGet.setNacimiento(nacimiento);
			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje = "usuario modificado";
		}
		catch(Exception e){
			e.printStackTrace();
			mensaje = "error modificando";
		}
		return mensaje;
	}
}
