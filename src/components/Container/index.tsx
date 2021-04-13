import React, { HTMLAttributes, StyleHTMLAttributes } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLoading } from '../../hooks/loading';
import { Loading } from '../Loading';

interface Breadcrumb {
  name: string;
  to?: string;
}

type ParamsPush = {
  id: string;
  value: string;
};
export interface ToolsContainerProps {
  name: string;
  to: string;
  icon: string;
  hasParams?: false | ParamsPush;
  handleOnClick?: <T>(currentValue: T | any) => void;
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  pageTitle: string;
  portletTitle: string;
  breadcrumb?: Breadcrumb[];
  tools?: ToolsContainerProps[];
  styleContent?: HTMLAttributes<HTMLDivElement>;
  Content?: () => JSX.Element;
}

const Container: React.FC<ContainerProps> = ({
  pageTitle,
  portletTitle,
  breadcrumb,
  tools,
  children,
  Content,
  ...props
}) => {
  const history = useHistory();
  const { loading } = useLoading();

  const handleClickAction = ({
    hasParams,
    icon,
    name,
    to,
    handleOnClick,
  }: ToolsContainerProps) => {
    if (!handleOnClick) {
      history.push(`${to}`, {
        id: hasParams ? hasParams.id : '',
        value: hasParams ? hasParams.value : '',
      });
    }
    if (handleOnClick !== undefined) {
      handleOnClick({ hasParams, icon, name, to, handleOnClick });
    }
  };

  return (
    <div
      {...props}
      style={{
        margin: '0 -40px',
      }}
      className="page-content-wrapper"
    >
      <Loading isActive={loading} />
      <div className="page-head">
        <div className="container-fluid">
          <div className="page-title">
            <h1>{pageTitle}</h1>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container-fluid">
          {breadcrumb && (
            <ul className="page-breadcrumb breadcrumb">
              {breadcrumb.map((bread, i) => (
                <li key={bread.name}>
                  {(bread.to && <Link to={bread.to}>{bread.name}</Link>) ||
                    bread.name}
                  {breadcrumb.length !== i + 1 && (
                    <i className="fa fa-circle" />
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="page-content-inner">
            <div className="mt-content-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="portlet light bordered">
                    {Content ? (
                      <Content />
                    ) : (
                      <>
                        <div className="portlet-title">
                          <div className="caption">{portletTitle}</div>
                          {tools && (
                            <div className="tools">
                              {tools.map(tool => (
                                <a
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  key={Math.random()}
                                  onClick={() => {
                                    handleClickAction(tool);
                                  }}
                                >
                                  <i className={tool.icon} /> {tool.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="portlet-body form">{children} </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
