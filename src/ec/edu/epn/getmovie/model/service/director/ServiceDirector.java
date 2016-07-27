package ec.edu.epn.getmovie.model.service.director;
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

import ec.edu.epn.getmovie.model.Director;
@Path("Director")
@Produces("application/json")
public class ServiceDirector {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieREST");
	@GET
	@Path("buscar")
	public Director buscarDirector(@QueryParam("id")int idDirector) {
		Director director = new Director();
		try{
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			director = em.find(Director.class, idDirector);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}
		return director;
	}
	@POST
	@Path("crear")
	public void crearDirector(
			@QueryParam("nombre")String nombre,
			@QueryParam("genero")String genero,
			@QueryParam("nacimiento")String nacimiento
			){
		Director director = new Director();
		try{
			director.setGenero(genero);
			director.setNombredirector(nombre);
			director.setNacimiento(nacimiento);
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			em.persist(director);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
	public Collection<Director> listarDirector(@QueryParam("nombre")String nombreDirector) {
		Collection<Director> listaDirector = null;
		try{
			EntityManager em = emf.createEntityManager();
			Query q = em.createNamedQuery("Director.findByNombre");
			q.setParameter("nombre", "%" + nombreDirector + "%");
			listaDirector = q.getResultList();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}
		return listaDirector;
	}
	@DELETE
	@Path("eliminar")
	public void eliminarDirector(@QueryParam("id")int idDirector) {
		try{
			EntityManager em = emf.createEntityManager();
			Director director = em.find(Director.class, idDirector);
			em.getTransaction().begin();	
			em.remove(director);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}	
	}
	@PUT
	@Path("modificar")
	public void modificarDirector(
			@QueryParam("id")int id,
			@QueryParam("nombre")String nombre,
			@QueryParam("genero")String genero,
			@QueryParam("nacimiento")String nacimiento
			){
		
		try{
			EntityManager em = emf.createEntityManager();
			Director director = em.find(Director.class, id);
			em.getTransaction().begin();
			director.setNombredirector(nombre);
			director.setGenero(genero);
			director.setNacimiento(nacimiento);
			em.getTransaction().commit();
			em.close();
			emf.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
