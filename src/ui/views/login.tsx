import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/ui/context/auth-context";
import { User, LogIn, Info } from "lucide-react"; // Ikona informacji dla regulaminu

const Login = () => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false); // Stan do kontrolowania wyświetlania modalu
  const [isSubmitting, setIsSubmitting] = useState(false); // Dodane do obsługi animacji przy logowaniu
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (name.trim()) {
      setIsSubmitting(true); // Rozpocznij animację przy logowaniu
      setTimeout(() => {
        login();
        navigate("/");
      }, 500); // Dodajemy opóźnienie dla animacji
    }
  };

  const isValidLogin = (name: string | any[]) => name.length >= 3; // Przykład prostego sprawdzania loginu

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900">
      <div className="card w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-500 transform hover:scale-105">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
            alt="Chat Icon"
            className="w-16 h-16 mb-4 animate-bounce hover:scale-110"
          />
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Witaj w naszym czacie!
          </h2>
          <p className="text-xl text-white opacity-80 text-center mb-6">
            Wprowadź swój login, aby rozpocząć rozmowę.
          </p>
        </div>

        <div className="form-control w-full mb-4">
          <div className="flex items-center bg-gray-700 rounded-full p-3">
            <User size={20} className="text-white mr-3" />
            <input
              type="text"
              placeholder="Wpisz swój login"
              className="input input-bordered w-full bg-gray-700 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.placeholder = "Podaj swój unikalny login"}
              onBlur={(e) => e.target.placeholder = "Wpisz swój login"}
            />
          </div>
          {name.trim() && !isValidLogin(name) && (
            <p className="text-red-500 text-sm mt-2">Login jest niepoprawny. Spróbuj ponownie.</p>
          )}
        </div>

        <button
          className={`btn w-full ${!name.trim() ? "btn-disabled opacity-50" : "bg-indigo-600 hover:bg-indigo-700"} rounded-full py-3`}
          onClick={handleLogin}
          disabled={!name.trim() || !isValidLogin(name) || isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner-border animate-spin h-5 w-5 border-4 border-indigo-300 rounded-full" />
          ) : (
            <>
              <LogIn size={20} className="mr-2" />
              Zaloguj
            </>
          )}
        </button>

        <div className="mt-8 text-center text-gray-300">
          <h3 className="text-lg font-semibold">Czat na żywo z ludźmi na całym świecie</h3>
          <p className="text-sm">Zacznij rozmawiać teraz, wprowadź swój login, aby dołączyć do naszej społeczności!</p>
        </div>

        <div className="text-center mt-4">
          <button
            className="text-indigo-300 hover:text-indigo-500 flex items-center justify-center"
            onClick={() => setShowModal(true)}
          >
            <Info size={16} className="mr-2" />
            Regulamin czatu
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-white text-black p-6 rounded-xl w-1/3 shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Regulamin czatu</h3>
            <p className="text-sm mb-4">Zapoznaj się z naszym regulaminem, aby korzystać z czatu w sposób bezpieczny i odpowiedzialny.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nie obrażaj innych użytkowników.</li>
              <li>Zachowuj szacunek w rozmowach.</li>
              <li>Nie udostępniaj prywatnych danych.</li>
              <li>Czat jest tylko do celów towarzyskich.</li>
            </ul>
            <div className="mt-4 text-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setShowModal(false)}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
