import { authStore } from "../store/authStore";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserPreferences from "../components/UserPreferences";
import { preferencesStore } from "../store/preferencesStore";
import { Save } from "lucide-react";

function ProfilePage() {
  const { isAuthenticated, checkAuth } = authStore();
  const navigate = useNavigate();
  const { getUserPreferences, setPreferences, isSaving, userProfile } =
    preferencesStore();
  const [preferencesData, setPreferencesData] = useState({
    favorites_movies: [],
    disliked_genres: [],
    favorites_directors: [],
    favorites_actors: [],
    favorites_themes: [],
    preferred_platform: null,
    content_restriction: null,
  });
  const [userPreferences, setUserPreferences] = useState({
    favorites_movies: [],
    disliked_genres: [],
    favorites_directors: [],
    favorites_actors: [],
    favorites_themes: [],
    preferred_platform: null,
    content_restriction: null,
  });

  const [mergedPreferences, setMergedPreferences] = useState({});

  useEffect(() => {
    const merged = Object.keys(userPreferences).reduce((acc, key) => {
      const localValue = preferencesData[key];
      const isValid = Array.isArray(localValue)
        ? localValue.length > 0
        : localValue !== null;

      acc[key] = isValid ? localValue : userPreferences[key];
      return acc;
    }, {});
    setMergedPreferences(merged);
  }, [userPreferences, preferencesData]);

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

  useEffect(() => {
    const fetchGetPreferences = async () => {
      const res = await getUserPreferences();
      setUserPreferences({
        favorites_movies: res.favorites_movies,
        disliked_genres: res.disliked_genres,
        favorites_directors: res.favorites_directors,
        favorites_actors: res.favorites_actors,
        favorites_themes: res.favorites_themes,
        preferred_platform: res.preferred_platform,
        content_restriction: res.content_restriction,
      });
    };

    fetchGetPreferences();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    /*Deberia probar que efectivamente se hicieron cambios para ahorrar llamadas innecesarias.*/

    console.log("merged: ", mergedPreferences);

    const res = await setPreferences(mergedPreferences);
    console.log(res);
  };

  //console.log("UserPreferences: ", userPreferences);
  //console.log("PreferencesData: ", preferencesData);

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
            <div className="flex justify-end">
              <div
                onClick={(e) => handleSave(e)}
                className="w-30 gap-2 border-base-content/70 justify-center items-center rounded-lg cursor-pointer border-2 h-10 flex flex-row"
              >
                {isSaving ? (
                  <>
                    <span className="loading text-base-content loading-spinner loading-xs"></span>
                  </>
                ) : (
                  <>
                    {" "}
                    <Save />
                    <span>Guardar</span>
                  </>
                )}
              </div>
            </div>
            <UserPreferences
              value={preferencesData.favorites_movies}
              getTags={userPreferences.favorites_movies}
              cantidad={3}
              subtitulo="Agrega hasta 3 peliculas"
              titulo="Peliculas favoritas"
              onChange={(nuevoValor) =>
                setPreferencesData((prev) => ({
                  ...prev,
                  favorites_movies: nuevoValor,
                }))
              }
            />
            <UserPreferences
              cantidad={5}
              subtitulo="Agrega hasta 5 generos que evitas"
              titulo="Géneros que no te gustan"
              value={preferencesData.disliked_genres}
              getTags={userPreferences.disliked_genres}
              onChange={(nuevoValor) =>
                setPreferencesData((prev) => ({
                  ...prev,
                  disliked_genres: nuevoValor,
                }))
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <UserPreferences
                getTags={userPreferences.favorites_directors}
                cantidad={3}
                subtitulo="Agrega hasta 3 directores que admiras"
                titulo="Directores favoritos"
                value={preferencesData.favorites_directors}
                onChange={(nuevoValor) =>
                  setPreferencesData((prev) => ({
                    ...prev,
                    favorites_directors: nuevoValor,
                  }))
                }
              />
              <UserPreferences
                getTags={userPreferences.favorites_actors}
                value={preferencesData.favorites_actors}
                cantidad={3}
                subtitulo="Agrega hasta 3 actores que te gusten"
                titulo="Acotres favoritos"
                onChange={(nuevoValor) =>
                  setPreferencesData((prev) => ({
                    ...prev,
                    favorites_actors: nuevoValor,
                  }))
                }
              />
            </div>
            <UserPreferences
              getTags={userPreferences.favorites_themes}
              value={preferencesData.favorites_themes}
              cantidad={3}
              titulo="Temáticas preferidas"
              subtitulo="Agrega hasta 5 temáticas que disfrutes ver"
              onChange={(nuevoValor) =>
                setPreferencesData((prev) => ({
                  ...prev,
                  favorites_themes: nuevoValor,
                }))
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <UserPreferences
                getTags={userPreferences.preferred_platform}
                value={preferencesData.preferred_platform}
                cantidad={3}
                subtitulo="Elije tu plataforma"
                titulo="Plataforma favorita"
                onChange={(nuevoValor) =>
                  setPreferencesData((prev) => ({
                    ...prev,
                    preferred_platform: nuevoValor,
                  }))
                }
              />
              <UserPreferences
                getTags={userPreferences.content_restriction}
                value={preferencesData.content_restriction}
                cantidad={3}
                subtitulo="Elije si quieres evitar contenido explícito"
                titulo="Reestricción"
                onChange={(nuevoValor) =>
                  setPreferencesData((prev) => ({
                    ...prev,
                    content_restriction: nuevoValor,
                  }))
                }
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
