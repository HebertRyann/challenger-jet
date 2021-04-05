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

type TypeDataOverViewProps = {
  typeSelectProdut: EntityWithIdAndNameField;
  categoryCost: EntityWithIdAndNameField;
  subCategoryCost: EntityWithIdAndNameField;
  groupProduct: EntityWithIdAndNameField;
  hasVariation: HasVariation;
  nameProduct: string;
};

type TypeValueAndError = {
  value: string;
  error: {
    isError: boolean;
    descriptionError?: string;
  };
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

interface TabCreateContext {
  setDataOverView: (overView: TypeDataOverViewProps) => void;
  getDataOverView: () => TypeDataOverViewProps;
  setDetails: (details: TypeDetailsProps) => void;
  getDetails: () => TypeDetailsProps;
  validationAndSetErrorAllFieldsDetails: () => boolean;
}

const TabCreateContext = createContext<TabCreateContext>(
  {} as TabCreateContext,
);

const TabCreateProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const initialStateIdAndNameFieild = { id: '', name: '', parent_id: null };

  const initialStateOverview: TypeDataOverViewProps = {
    categoryCost: initialStateIdAndNameFieild,
    subCategoryCost: initialStateIdAndNameFieild,
    groupProduct: initialStateIdAndNameFieild,
    typeSelectProdut: initialStateIdAndNameFieild,
    hasVariation: {
      name: '',
      hasVariation: false,
    },
    nameProduct: '',
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

  return (
    <TabCreateContext.Provider
      value={{
        getDataOverView,
        setDataOverView,
        setDetails,
        getDetails,
        validationAndSetErrorAllFieldsDetails,
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
