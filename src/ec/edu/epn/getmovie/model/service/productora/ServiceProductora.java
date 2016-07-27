package ec.edu.epn.getmovie.model.service.productora;

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

import com.oracle.jrockit.jfr.Producer;

import ec.edu.epn.getmovie.model.Productora;

@Path("productora")
@Produces("application/json")
public class ServiceProductora {
	EntityManagerFactory emf = Persistence
			.createEntityManagerFactory("GetMovieJPA");

	@POST
	@Path("crear")
	public String crearProductora(
			@QueryParam("nombreProductora") String nombreProductora,
			@QueryParam("paisProductora") String paisProductora) {
		// entityManager permite usar el crud (crear consultar eliminar)

		String mensaje = "";
		try {
			EntityManager em = emf.createEntityManager();
			Productora productorita = new Productora();
			productorita.setNombreproductora(nombreProductora);
			productorita.setPaisproductora(paisProductora);

			// permite iniciar la query
			em.getTransaction().begin();
			// permite hacer la creacion del objeto, persist = insert
			em.persist(productorita);
			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			mensaje = "Productora creada correctamente";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error en la creacion de productora";
		}
		return mensaje;

	}

	@DELETE
	@Path("eliminar")
	public String eliminarProductora(
			@QueryParam("idProductora") int idproductora) {

		String mensaje = "";

		try {

			EntityManager em = emf.createEntityManager();
			Productora productora = em.find(Productora.class, idproductora);
			em.getTransaction().begin();
			em.remove(productora);
			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje = "Productora eliminada correctamente";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un erroe en la eliminacion de producctora";
		}

		return mensaje;
	}

	@PUT
	@Path("modificar")
	public String modificarProductora(
			@QueryParam("idProductora") int idProductora,
			@QueryParam("nombreProductora") String nombreProductora,
			@QueryParam("paisProductora") String paisProductora) {

		String mensaje = "";

		try {

			EntityManager em = emf.createEntityManager();
			Productora productora = em.find(Productora.class, idProductora);

			// permite iniciar la query
			em.getTransaction().begin();
			productora.setNombreproductora(nombreProductora);
			productora.setPaisproductora(paisProductora);

			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();

			mensaje = "Productora modificada con exito";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error con el modificado de productora";
		}

		return mensaje;
	}

	@GET
	@Path("buscar")
	public Productora buscarProductora(
			@QueryParam("idProductora") int idproductora) {
		Productora productora = new Productora();
		try {
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			productora = em.find(Productora.class, idproductora);

			em.getTransaction().commit();
			em.close();
			emf.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return productora;
	}

	@GET
	@Path("listar")
	@SuppressWarnings("unchecked")
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
