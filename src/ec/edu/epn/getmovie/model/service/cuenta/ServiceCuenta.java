package ec.edu.epn.getmovie.model.service.cuenta;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import ec.edu.epn.getmovie.model.Usuario;

@Path("cuenta")
@Produces("application/json")
public class ServiceCuenta {
	//Inyección de dependencias
	//@PersistenceContext(unitName="GetMovieJPA", type = PersistenceContextType.EXTENDED)
	//private EntityManagerFactory emf;
	
	@POST
	@Path(value="crear")
	@Consumes("application/json")
	public Map<String, String> crearUsuario(Usuario usuario) {
		Map<String, String> response = new HashMap<String, String>();
		try {
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			em.persist(usuario);
			em.getTransaction().commit();
			em.close();
			response.put("success", "Usuario creado existosamente.");
			return response;
		} catch (PersistenceException e) {
			System.out.println(e.getCause());
			response.put("danger", "El usuario ingresado ya se encuentra registrado.");
			return response;
		} catch (Exception e) {
			response.put("danger", "Ha ocurrido un error al crear usuario.");
			return response;
		}
	}

	@GET
	@Path(value="buscarByEmail")
	public Usuario buscarUsuario(
			@QueryParam(value="email") String email) {
		try {
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
			EntityManager em = emf.createEntityManager();
			
			em.getTransaction().begin();
			Usuario u = em.find(Usuario.class, email);
			em.getTransaction().commit();
			em.close();
			return u;
		} catch (Exception e) {
			return null;
		}
	}

	@POST
	@Path(value="login")
	@Consumes("application/json")
	public boolean loggingUsuario(Usuario usr) {
		System.out.println(usr.toString());
		try {
			Usuario usuario = buscarUsuario(usr.getCorreousr());
	
			if (usuario == null) {
				return false;
			} else if (usr.getClaveusr().equals(usuario.getClaveusr())) {
				return true;
			} else {
				return false;
		}
		} catch (Exception e) {
			return false;
		}
	}

	@GET
	@Path(value="listarByEmail")
	@SuppressWarnings("unchecked")
	public List<Usuario> listarUsuario(
			@QueryParam(value="email") String email) {
		System.out.println(email);
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		em.getTransaction();
		
		Query q = em.createNamedQuery("Usuario.findById");
		q.setParameter("correo", "%" + email + "%");
		List<Usuario> listaUsuario = q.getResultList();
		em.close();
		
		return listaUsuario;
	}

	@GET
	@Path(value="eliminar")
	public void eliminarUsuario(
			@QueryParam(value="email") String email) {
		System.out.println(email);
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		
		Usuario u = em.getReference(Usuario.class, email);
		em.getTransaction().begin();
		em.remove(u);
		em.getTransaction().commit();
		em.close();
	}
	
	@PUT
	@Path(value="modificar")
	@Consumes("application/json")
	public Map<String, String> modificarUsuario(Usuario usuario) {
		Map<String, String> response = new HashMap<String, String>();
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		
		try {
			Usuario u = em.getReference(Usuario.class, usuario.getCorreousr());
			u.setNombreusr(usuario.getNombreusr());
			u.setClaveusr(usuario.getClaveusr());
			
			em.getTransaction().begin();
			em.persist(u);
			em.getTransaction().commit();
			em.close();
			response.put("success", "Usuario modificado existosamente.");
			return response;
		} catch (Exception e) {
			response.put("danger", "Ha ocurrido un error al crear usuario.");
			return response;
		}
	}
}
