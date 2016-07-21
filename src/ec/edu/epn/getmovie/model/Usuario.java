package ec.edu.epn.getmovie.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the USUARIO database table.
 * 
 */
@Entity 
@Table(name = "USUARIO")
@NamedQueries({
	@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u"),
	@NamedQuery(name="Usuario.findById", query="SELECT u FROM Usuario u where u.correousr like :correo")
	})
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String correousr;

	private String claveusr;

	private byte estadousr;

	private byte isadmin;

	private String nombreusr;

	public Usuario() {
	}
	
	public Usuario(String correousr, String claveusr, byte estadousr, byte isadmin, String nombreusr) {
		super();
		this.correousr = correousr;
		this.claveusr = claveusr;
		this.estadousr = estadousr;
		this.isadmin = isadmin;
		this.nombreusr = nombreusr;
	}

	public String getCorreousr() {
		return this.correousr;
	}

	public void setCorreousr(String correousr) {
		this.correousr = correousr;
	}

	public String getClaveusr() {
		return this.claveusr;
	}

	public void setClaveusr(String claveusr) {
		this.claveusr = claveusr;
	}

	public byte getEstadousr() {
		return this.estadousr;
	}

	public void setEstadousr(byte estadousr) {
		this.estadousr = estadousr;
	}

	public byte getIsadmin() {
		return this.isadmin;
	}

	public void setIsadmin(byte isadmin) {
		this.isadmin = isadmin;
	}

	public String getNombreusr() {
		return this.nombreusr;
	}

	public void setNombreusr(String nombreusr) {
		this.nombreusr = nombreusr;
	}
}