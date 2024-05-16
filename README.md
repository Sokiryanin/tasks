/*

const getInitialFilters = () => {
  // получаем из localStorage выставленные ранее фильтры
  const savedFilters = localStorage.getItem('filters');
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return {
    taskTitle: '',
    priority: 'all',
  };
};

  const [filters, setFilters] = useState(getInitialFilters);

  еффект который реагирует на изменения в фильтре 
  сохраняет выставленные фильтры в localStorage
    useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);


     const changeFilters = (value, key) => {
  setFilters(prevFilters => ({
    ...prevFilters,
    [key]: value,
  }));
  };

  сброс всех фильтров
  const resetFilters = () => {
  setFilters({
    taskTitle: '',
    priority: 'all',
  });
  };
*/