import { useEffect, useState } from 'react';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const updateMatch = () => {
            // console.log(`Media query: "${query}"`); // Exibe a string do media query
            // console.log(`matches: ${mediaQueryList.matches}`); // Exibe o resultado do media query (true ou false)
            // alert(`Window dimensions: ${window.innerWidth}x${window.innerHeight}`); // Mostra as dimensões da janela atual
            setMatches(mediaQueryList.matches);
        };

        updateMatch(); // Inicializa com o valor atual
        mediaQueryList.addEventListener('change', updateMatch);

        return () => mediaQueryList.removeEventListener('change', updateMatch);
    }, [query]);

    return matches;
}

export default useMediaQuery;
