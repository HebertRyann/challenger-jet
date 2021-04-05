import React, { createContext, useCallback, useContext, useState } from 'react';

type EntityWithIdAndNameField = {
  id: string;
  name: string;
  parent_id: string | null;
};

type HasVariation = {
  hasVariation?: boolean;
  name: string;
};

type TypeGenericValueWithError<T> = {
  value: T;
  error: TypeError;
};

type TypeDataOverViewProps = {
  typeSelectProdut: TypeGenericValueWithError<EntityWithIdAndNameField>;
  categoryCost: TypeGenericValueWithError<EntityWithIdAndNameField>;
  subCategoryCost: TypeGenericValueWithError<EntityWithIdAndNameField>;
  groupProduct: TypeGenericValueWithError<EntityWithIdAndNameField>;
  hasVariation: TypeGenericValueWithError<HasVariation>;
  nameProduct: TypeGenericValueWithError<string>;
};

type TypeError = {
  isError: boolean;
  descriptionError?: string;
};

type TypeValueAndError = {
  value: string;
  error: TypeError;
};

type TypeDetailsProps = {
  weight: TypeValueAndError;
  width: TypeValueAndError;
  height: TypeValueAndError;
  length: TypeValueAndError;
  descriptionAndDetails: TypeValueAndError;
  technicalSpecification: TypeValueAndError;
  wayOfUse: TypeValueAndError;
};

type TypeGetAndSetAndValidateAba<T> = {
  getData: () => T;
  setData: (data: T) => void;
  validate: () => boolean;
};

interface TabCreateContext {
  overview: TypeGetAndSetAndValidateAba<TypeDataOverViewProps>;
  details: TypeGetAndSetAndValidateAba<TypeDetailsProps>;
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabCreateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const initialStateError: TypeError = {
    isError: false,
    descriptionError: '',
  };
  const initialStateIdAndNameFieild: TypeGenericValueWithError<EntityWithIdAndNameField> = {
    error: initialStateError,
    value: {
      id: '',
      name: '',
      parent_id: null,
    },
  };

  const initialStateOverview: TypeDataOverViewProps = {
    categoryCost: initialStateIdAndNameFieild,
    subCategoryCost: initialStateIdAndNameFieild,
    groupProduct: initialStateIdAndNameFieild,
    typeSelectProdut: initialStateIdAndNameFieild,
    hasVariation: {
      error: initialStateError,
      value: { name: '', hasVariation: false },
    },
    nameProduct: { error: initialStateError, value: '' },
  };

  const initialStateDetails: TypeDetailsProps = {
    descriptionAndDetails: { value: '', error: { isError: false } },
    height: { value: '', error: { isError: false } },
    length: { value: '', error: { isError: false } },
    technicalSpecification: { value: '', error: { isError: false } },
    wayOfUse: { value: '', error: { isError: false } },
    weight: { value: '', error: { isError: false } },
    width: { value: '', error: { isError: false } },
  };

  const [overView, setOverView] = useState<TypeDataOverViewProps>(
    initialStateOverview,
  );
  const [detail, setDetail] = useState<TypeDetailsProps>(initialStateDetails);

  const setDataOverView = (NewoverView: TypeDataOverViewProps) => {
    setOverView(NewoverView);
  };
  const getDataOverView = (): TypeDataOverViewProps => {
    return overView;
  };

  const validationAndSetErrorAllFieldsDataOverView = useCallback(() => {
    let isError = false;
    if (overView.typeSelectProdut.value.id === '') {
      isError = true;
      console.log('teste');
    }
    return isError;
  }, [overView]);

  const setDetails = (details: TypeDetailsProps) => setDetail(details);

  const getDetails = (): TypeDetailsProps => detail;

  const validationAndSetErrorAllFieldsDetails = useCallback(() => {
    let isError = false;

    if (detail.weight.value === '') {
      isError = true;
      detail.weight.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.width.value === '') {
      isError = true;
      detail.width.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.height.value === '') {
      isError = true;
      detail.height.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.length.value === '') {
      isError = true;
      detail.length.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.descriptionAndDetails.value === '') {
      isError = true;
      detail.descriptionAndDetails.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.technicalSpecification.value === '') {
      isError = true;
      detail.technicalSpecification.error.isError = true;
      setDetail({ ...detail });
    }
    if (detail.wayOfUse.value === '') {
      isError = true;
      detail.wayOfUse.error.isError = true;
      setDetail({ ...detail });
    }
    return isError;
  }, [detail]);

  const overview: TypeGetAndSetAndValidateAba<TypeDataOverViewProps> = {
    getData: getDataOverView,
    setData: setDataOverView,
    validate: validationAndSetErrorAllFieldsDataOverView,
  };
  const details: TypeGetAndSetAndValidateAba<TypeDetailsProps> = {
    getData: getDetails,
    setData: setDetails,
    validate: validationAndSetErrorAllFieldsDetails,
  };

  return (
    <TabCreateContext.Provider
      value={{
        overview,
        details,
      }}
    >
      {children}
    </TabCreateContext.Provider>
  );
};

function useTabCreate(): TabCreateContext {
  const context = useContext(TabCreateContext);

  if (!context) {
    throw new Error('useTabCreate must be used witin a TabCreateProvider');
  }

  return context;
}

export { TabCreateProvider, useTabCreate };
