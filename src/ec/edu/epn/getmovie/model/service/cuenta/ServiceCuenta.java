package ec.edu.epn.getmovie.model.service.cuenta;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import ec.edu.epn.getmovie.model.Usuario;

@Path("cuenta")
@Produces("application/json")
public class ServiceCuenta {
	//Inyección de dependencias
	//@PersistenceContext(unitName="GetMovieJPA", type = PersistenceContextType.EXTENDED)
	//private EntityManagerFactory emf;
	
	@POST
	@Path(value="crear")
	public void crearUsuario(
			@QueryParam(value="nombre") String nombreusr,
			@QueryParam(value="email") String correousr,
			@QueryParam(value="clave") String claveusr,
			@QueryParam(value="estado") byte estadousr,
			@QueryParam(value="isAdmin") byte isadmin
			) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		
		Usuario usuario = new Usuario(correousr, claveusr, estadousr, isadmin, nombreusr);
		em.getTransaction().begin();
		em.persist(usuario);
		em.getTransaction().commit();
		em.close();
	}

	@GET
	@Path(value="buscarByEmail")
	public Usuario buscarUsuario(
			@QueryParam(value="email") String email) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		
		em.getTransaction().begin();
		Usuario u = em.find(Usuario.class, email);
		em.getTransaction().commit();
		em.close();

		return u;
	}

	@GET
	@Path(value="login")
	public boolean loggingUsuario(
			@QueryParam(value="email") String email, 
			@QueryParam(value="clave") String clave
			) {
		Usuario usuario = buscarUsuario(email);

		if (usuario == null) {
			return false;
		} else if (clave.equals(usuario.getClaveusr())) {
			return true;
		} else {
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

	@DELETE
	@Path(value="eliminar")
	public void eliminarUsuario(
			@QueryParam(value="email") String email) {
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
	public void modificarUsuario(
			@QueryParam(value="nombre") String nombreusr,
			@QueryParam(value="email") String correousr,
			@QueryParam(value="clave") String claveusr
			) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("GetMovieJPA");
		EntityManager em = emf.createEntityManager();
		
		Usuario u = em.getReference(Usuario.class, correousr);
		u.setNombreusr(nombreusr);
		u.setClaveusr(claveusr);
		
		em.getTransaction().begin();
		em.persist(u);
		em.getTransaction().commit();
		em.close();
	}
}
