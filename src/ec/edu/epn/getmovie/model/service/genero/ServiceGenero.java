package ec.edu.epn.getmovie.model.service.genero;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import ec.edu.epn.getmovie.model.Genero;

@Path("genero")
@Produces("application/json")
public class ServiceGenero {

	// definir la persistencia, en una variable para instanciar
	// GetMovieJPA es el nombre en la persistencia

	EntityManagerFactory emf = Persistence
			.createEntityManagerFactory("GetMovieJPA");

	@POST
	@Path("crear")
	@Consumes("application/json")
	public Map<String, String> crearGenero(Genero generito) {
		Map<String, String> response = new HashMap<String, String>();
		try {
			// entityManager permite usar el crud (crear consultar eliminar)
			EntityManager em = emf.createEntityManager();
			// permite iniciar la query
			em.getTransaction().begin();
			// permite hacer la creacion del objeto, persist = insert
			em.persist(generito);
			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			response.put("success", "G�nero creado existosamente.");
			return response;
		} catch (Exception e) {
			response.put("danger", "Ha ocurrido un error al crear g�nero.");
			return response;
		}
	}

	@DELETE
	@Path("eliminar")
	@Consumes("application/json")
	public Map<String, String> eliminarGenero(@QueryParam("idGenero") int idGenero) {
		Map<String, String> response = new HashMap<String, String>();
		try {
			EntityManager em = emf.createEntityManager();
			Genero genero = em.find(Genero.class, idGenero);
			em.getTransaction().begin();
			em.remove(genero);
			em.getTransaction().commit();
			em.close();
			emf.close();
			response.put("success", "G�nero eliminado existosamente.");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.put("danger", "Ha ocurrido un error al eliminar g�nero.");
			return response;
		}
	}

	@PUT
	@Path("modificar")
	@Consumes("application/json")
	public Map<String, String> modificarGenero(Genero g) {
		Map<String, String> response = new HashMap<String, String>();
		try {
			EntityManager em = emf.createEntityManager();

			Genero generito = em.find(Genero.class, g.getIdgenero());

			// permite iniciar la query
			em.getTransaction().begin();

			generito.setNombregenero(g.getNombregenero());
			generito.setDescripciongenero(g.getDescripciongenero());

			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			response.put("success", "G�nero modificado existosamente.");
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			response.put("danger", "Ha ocurrido un error al modificar g�nero.");
			return response;
		}
	}

	@GET
	@Path("buscar")
	@Consumes("applicacion/json")
	public Genero buscarGenero(@QueryParam("idGenero") int idgenero) {
		String mensaje = "";
		Genero generito = new Genero();
		try {
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			generito = em.find(Genero.class, idgenero);

			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje = "Genero encontrado";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error en la busqueda de genero";
		}

		return generito;
	}

	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
	@Consumes("application/json")
	public Collection<Genero> listarGenero(
			@QueryParam("nombreGenero") String nombreGenero) {
		EntityManager em = emf.createEntityManager();
		Query q = em.createNamedQuery("Genero.findByNombre");
		q.setParameter("nombreGeneroABuscarQuery", "%" + nombreGenero + "%");
		Collection<Genero> listagenero = q.getResultList();
		em.close();
		emf.close();
		return listagenero;
	}
}