import { useForm } from "react-hook-form";
function App() {
  //* Todo hook se ejecuta al inicio
  //* register permite registrar cada input
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "Juan",
      correo: "juanperes@gmail.com",
      password: "123456",
    },
  });

  console.log(errors.fechaNacimiento); //*hace un llenado de objeto cuando el segundo arg required es true
  //* Hay que validar si nombre existe

  const onSubmit = handleSubmit((data) => {
    console.log(data.foto);
    //*Se pueden cambiar etc
    alert("enviado datos...");

    reset() //*Para limpiar todos los valores
    // setValue("correo", ""); //*Que su nuevo valor este vacio
  });
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
          required: {
            value: true,
            message: "Confirmar password es requerido",
          },
          validate: (value) => watch("password") === value || "Las passwords no coinciden",
        })}
      />
      {errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}
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
            return edad >= 18 || "debes ser mayor de edad";
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
      {watch("pais") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          ></input>
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}
      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input
        //
        type="file"
        onChange={(e) => {
          e.target.files[0]; /* Evento on change */
          setValue("fotoDelUsuario", e.target.files[0]); /* segundo arg es el valor, primero el nombre */
        }}
        {...register("foto")}
      />
      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input
        //
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los terminos y condiciones",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}
      <button>Enviar</button>
      <pre>{JSON.stringify(watch("password"), null, 2)}</pre>
      {/* Se guarda inmediatamente en el estado al solo escribir */}
    </form>
  );
}

export default App;
