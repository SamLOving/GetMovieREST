package ec.edu.epn.getmovie.model.service.productora;

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

import com.oracle.jrockit.jfr.Producer;

import ec.edu.epn.getmovie.model.Productora;

@Path("productora")
@Produces("application/json")
public class ServiceProductora {
	EntityManagerFactory emf = Persistence
			.createEntityManagerFactory("GetMovieJPA");

	@POST
	@Path("crear")
	@Consumes("application/json")
	public Map<String, String> crearProductora(Productora p) {
		// entityManager permite usar el crud (crear consultar eliminar)

		Map<String, String> response = new HashMap<String, String>();
		try {
			EntityManager em = emf.createEntityManager();
			

			// permite iniciar la query
			em.getTransaction().begin();
			// permite hacer la creacion del objeto, persist = insert
			em.persist(p);
			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			response.put("success", "Productora creado existosamente.");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.put("danger", "Ha ocurrido un error al crear productora.");
			return response;
		}

	}

	@DELETE
	@Path("eliminar")	
	@Consumes("application/json")
	public Map<String, String> eliminarProductora(
			@QueryParam("idProductora") int idproductora) {

		Map<String, String> response = new HashMap<String, String>();

		try {

			EntityManager em = emf.createEntityManager();
			Productora productora = em.find(Productora.class, idproductora);
			em.getTransaction().begin();
			em.remove(productora);
			em.getTransaction().commit();
			em.close();
			emf.close();
			response.put("success", "Productora eliminado existosamente.");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.put("danger", "Ha ocurrido un error al eliminar productora.");
			return response;
		}
	}

	@PUT
	@Path("modificar")
	@Consumes("application/json")
	public Map<String, String> modificarProductora(Productora p) {

		Map<String, String> response = new HashMap<String, String>();

		try {

			EntityManager em = emf.createEntityManager();
			Productora productora = em.find(Productora.class, p.getIdproductora());

			// permite iniciar la query
			em.getTransaction().begin();
			productora.setNombreproductora(p.getNombreproductora());
			productora.setPaisproductora(p.getPaisproductora());

			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();

			response.put("success", "Productora modificado existosamente.");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.put("danger", "Ha ocurrido un error al modificar productora.");
			return response;
		}
	}

	@GET
	@Path("buscar")
	@Consumes("application/json")
	public Productora buscarProductora(
			@QueryParam("idProductora") int idproductora) {
		String mensaje="";
		Productora productora = new Productora();
		try {
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			productora = em.find(Productora.class, idproductora);

			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje="Productora Encontrada";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje="Ocurrio un error en la busqueda de Productora";
		}

		return productora;
	}

	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
	@Consumes("application/json")
	public Collection<Productora> listarProductora(
			@QueryParam("nombreProductora") String nombreproductora) {
		EntityManager em = emf.createEntityManager();
		Query q = em.createNamedQuery("Productora.findByNombre");
		q.setParameter("nombreProductoraABuscarQuery", "%" + nombreproductora
				+ "%");
		Collection<Productora> listaproductora = q.getResultList();
		em.close();
		emf.close();
		return listaproductora;
	}
}
