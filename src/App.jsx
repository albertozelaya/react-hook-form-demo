import { useForm } from "react-hook-form";
function App() {
  //* Todo hook se ejecuta al inicio
  //* register permite registrar cada input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors.fechaNacimiento); //*hace un llenado de objeto cuando el segundo arg required es true
  //* Hay que validar si nombre existe

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      {/* El arg es la data que se envia */}
      {/* Nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        //
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "El nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener 2 caracteres",
          },
          maxLength: {
            value: 6,
            message: "El nombre debe tener maximo 6 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      {/* {errors.nombre?.type === "minLength" && <span>Minimo 2 caracteres</span>} */}
      {/* Todos los campos  asignarlos al input*/}
      {/* Correo */}
      <label htmlFor="correo">Correo</label>
      <input
        //
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email es requerido",
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ /* poner una expresion regular */,
            message: "El correo no es valido",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        //
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
        })}
      />
      {errors.password && <span>Contra es requerida</span>}
      {/* Confirm password */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        //
        type="password"
        {...register("confirmarPassword", {
          required: true,
        })}
      />
      {errors.confirmarPassword && <span>La confirmación es requerida</span>}
      {/* Fecha de nacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        //
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida",
          },
          validate: (value) => {
            console.log(value);
            const fechaNacimient = new Date(value);
            const fechaActual = new Date();
            const edad = fechaNacimient.getFullYear() - fechaActual.getFullYear();
            // console.log(fechaNacimient);
            // const verifi = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
            // console.log(fechaNacimient.getTime());
            // if (fechaNacimient.getTime() > verifi.getTime()) return "Fecha de nacimiento no valida";
            // console.log(new Date().getFullYear() - 18);
            return edad >= 18 || "debes ser mayor de edad"
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}
      {/* Pais */}
      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        {" "}
        {/* En el padre */}
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input
        //
        type="file"
        {...register("foto")}
      />
      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input
        //
        type="checkbox"
        {...register("terminos", { required: true })}
      />
      {errors.terminos && <span>Te y condiciones son requeridos</span>}
      <button>Enviar</button>
    </form>
  );
}

export default App;
