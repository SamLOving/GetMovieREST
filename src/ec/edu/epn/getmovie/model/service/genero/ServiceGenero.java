package ec.edu.epn.getmovie.model.service.genero;

import java.util.Collection;

import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
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
	public String crearGenero(@QueryParam("nombreGenero") String nombreGenero,
			@QueryParam("descripcionGenero") String descripcionGenero) {

		String mensaje = "";
		try {
			// entityManager permite usar el crud (crear consultar eliminar)
			EntityManager em = emf.createEntityManager();
			Genero generito = new Genero();
			generito.setNombregenero(nombreGenero);
			generito.setDescripciongenero(descripcionGenero);
			// permite iniciar la query
			em.getTransaction().begin();
			// permite hacer la creacion del objeto, persist = insert
			em.persist(generito);
			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			mensaje = "Genero creado correctamente";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error en la creacion de genero";
		}

		return mensaje;
	}

	@DELETE
	@Path("eliminar")
	public String eliminarGenero(@QueryParam("idGenero") int idGenero) {
		String mensaje = "";
		try {
			EntityManager em = emf.createEntityManager();
			Genero genero = em.find(Genero.class, idGenero);
			em.getTransaction().begin();
			em.remove(genero);
			em.getTransaction().commit();
			em.close();
			emf.close();
			mensaje = "Genero eliminado correctamente";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error en la eliminacion de Genero";
		}
		return mensaje;
	}

	@PUT
	@Path("modificar")
	public String modificarGenero(@QueryParam("idGenero") int idGenero,
			@QueryParam("nombreGenero") String nombreGenero,
			@QueryParam("descripcionGenero") String descripcionGenero) {
		String mensaje = "";
		try {
			EntityManager em = emf.createEntityManager();

			Genero generito = em.find(Genero.class, idGenero);

			// permite iniciar la query
			em.getTransaction().begin();

			generito.setNombregenero(nombreGenero);
			generito.setDescripciongenero(descripcionGenero);

			// una query se asegura de que se realice, se hizo o no
			em.getTransaction().commit();
			// siempre se cierra el entitymanager
			em.close();
			emf.close();
			mensaje = "Genero modificado con exito";
		} catch (Exception e) {
			e.printStackTrace();
			mensaje = "Ocurrio un error con el modificado de genero";
		}
		return mensaje;
	}

	@GET
	@Path("buscar")
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
