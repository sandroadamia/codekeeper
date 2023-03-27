import { useSearchParams } from 'react-router-dom';

export default function usePartialSearchParams() {
  const [searchParams, _setSearchParams] = useSearchParams();

  const setSearchParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    for (const key in newParams) {
      if (newParams[key] === undefined) {
        delete newParams[key];
      }
    }
    const _newParams = new URLSearchParams(newParams);

    for (const [key, value] of _newParams) {
      params.set(key, value);
    }

    _setSearchParams(_newParams);
  };

  return [searchParams, setSearchParams] as const;
}