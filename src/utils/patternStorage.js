// Utilidades para el almacenamiento local de patrones

const STORAGE_KEY = "flamenco_patterns";

export const saveCustomPattern = (pattern) => {
  try {
    const savedPatterns = getSavedPatterns();
    const timestamp = new Date().toISOString();
    const newPattern = {
      id: `pattern_${timestamp}`,
      ...pattern,
      createdAt: timestamp,
    };

    savedPatterns.push(newPattern);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPatterns));
    return newPattern;
  } catch (error) {
    console.error("Error al guardar el patrón:", error);
    return null;
  }
};

export const getSavedPatterns = () => {
  try {
    const patterns = localStorage.getItem(STORAGE_KEY);
    return patterns ? JSON.parse(patterns) : [];
  } catch (error) {
    console.error("Error al obtener los patrones guardados:", error);
    return [];
  }
};

export const deletePattern = (patternId) => {
  try {
    const patterns = getSavedPatterns();
    const filteredPatterns = patterns.filter((p) => p.id !== patternId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPatterns));
    return true;
  } catch (error) {
    console.error("Error al eliminar el patrón:", error);
    return false;
  }
};
