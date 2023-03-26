import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from "react-i18next";
import { useStore } from 'effector-react';
import {
  $searchText,
  $cities,
  $selectedCity,
  searchTextChanged,
  citySelected,
} from './store';
import type { LocationDataWithId } from '@/services/api/types';

export default function LocationSearchField() {
  const { t, i18n } = useTranslation();
  const search = useStore($searchText);
  const currentCity = useStore($selectedCity);
  const cities = useStore($cities);

  const getOptionLabel = React.useCallback((option: LocationDataWithId) => {
    return option.local_names?.[i18n.language] || option.name;
  }, [i18n]);

  return (
    <Autocomplete
      disablePortal
      options={cities}
      sx={{ flexGrow: 1 }}
      value={currentCity}
      inputValue={search}
      onChange={(_event: any, newValue: LocationDataWithId | null) => citySelected(newValue)}
      onInputChange={(_event, newInputValue) => searchTextChanged(newInputValue)}
      renderInput={(params) => <TextField {...params} label={t('city')} />}
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      noOptionsText={t('noResults')}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {getOptionLabel(option)}
          </li>
        );
      }}
    />
  );
}