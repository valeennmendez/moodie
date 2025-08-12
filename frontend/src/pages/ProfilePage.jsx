import { authStore } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPreferences from "../components/UserPreferences";

function ProfilePage() {
  const { isAuthenticated, checkAuth } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await checkAuth();
        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al chequear autenticación:", error);
        navigate("/login");
      }
    };

    fetchAuth();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-base-200 flex flex-col items-center p-10">
      {isAuthenticated ? (
        <>
          <div className="text-center">
            <h1 className="text-base-content font-bold text-4xl">
              Tu perfil cinematográfico
            </h1>
            <h3 className="text-base-content/70 font-semibold text-lg">
              Cuéntanos tus gustos para recomendaciones más personalizadas
            </h3>
          </div>
          <div className="w-[70%] flex flex-col gap-3 py-3">
            <UserPreferences
              cantidad={3}
              subtitulo="Agrega hasta 3 peliculas"
              titulo="Peliculas favoritas"
            />
            <UserPreferences
              cantidad={5}
              subtitulo="Agrega hasta 5 generos que evitas"
              titulo="Géneros que no te gustan"
            />
            <div className="grid grid-cols-2 gap-3">
              <UserPreferences
                cantidad={3}
                subtitulo="Agrega hasta 3 directores que admiras"
                titulo="Directores favoritos"
              />
              <UserPreferences
                cantidad={3}
                subtitulo="Agrega hasta 3 actores que te gusten"
                titulo="Acotres favoritos"
              />
            </div>
            <UserPreferences
              cantidad={3}
              titulo="Temáticas preferidas"
              subtitulo="Agrega hasta 5 temáticas que disfrutes ver"
            />
            <div className="grid grid-cols-2 gap-3">
              <UserPreferences
                cantidad={3}
                subtitulo="Elije tu plataforma"
                titulo="Plataforma favorita"
              />
              <UserPreferences
                cantidad={3}
                subtitulo="Elije si quieres evitar contenido explícito"
                titulo="Reestricción"
              />
            </div>
          </div>
        </>
      ) : (
        <div>No estás autenticado, debes loguearte.</div>
      )}
    </div>
  );
}

export default ProfilePage;
