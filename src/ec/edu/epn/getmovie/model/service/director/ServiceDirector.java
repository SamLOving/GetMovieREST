package ec.edu.epn.getmovie.model.service.director;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

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

import ec.edu.epn.getmovie.model.Director;
@Path("director")
@Produces("application/json")
public class ServiceDirector {
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
	@GET
	@Path("buscar")
	@Consumes("application/json")
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
	@Consumes("application/json")
	public Map<String, String> crearDirector(Director director){
		Map<String, String> response = new HashMap<String, String>();
		try{
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			em.persist(director);
			em.getTransaction().commit();
			em.close();
			emf.close();
			response.put("success", "Director creado con éxito.");
			return response;
		}catch(Exception e){
			e.printStackTrace();
			response.put("danger", "Director no creado.");
			return response;
		}
	}
	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
	@Consumes("application/json")
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
	@Consumes("application/json")
	public Map<String, String> eliminarDirector(@QueryParam("id")int idDirector) {
		Map<String, String> response = new HashMap<String, String>();
		try{
			EntityManager em = emf.createEntityManager();
			Director director = em.find(Director.class, idDirector);
			em.getTransaction().begin();	
			em.remove(director);
			em.getTransaction().commit();
			em.close();
			emf.close();
			response.put("success", "Actor eliminado con éxito.");
			return response;
		}catch(Exception e){
			e.printStackTrace();
			response.put("danger", "Actor no eliminado.");
			return response;
		}	
	}
	@PUT
	@Path("modificar")
	@Consumes("application/json")
	public Map<String, String> modificarDirector(Director d){
		Map<String, String> response = new HashMap<String, String>();
		try{	
			EntityManager em = emf.createEntityManager();
			Director director = em.find(Director.class, d.getIddirector());
			em.getTransaction().begin();
			director.setNombredirector(d.getNombredirector());
			director.setGenero(d.getGenero());
			director.setNacimiento(d.getNacimiento());
			em.getTransaction().commit();
			em.close();
			emf.close();
			response.put("success", "Actor modificado con éxito.");
			return response;
		}catch(Exception e){
			e.printStackTrace();
			response.put("danger", "Actor no modificado.");
			return response;
		}
	}
}
