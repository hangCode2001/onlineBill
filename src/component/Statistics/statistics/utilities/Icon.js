import React from 'react';
import classnames from "classnames"

let importAll = (requireContext) => requireContext.keys().forEach(requireContext);
try { importAll(require.context('../../../../imgs/statistics', true, /\.svg$/)); } catch (error) { console.log(error); }

const Icon = (props) => {
  const { name, children, className, ...rest } = props;

  return (
    <svg className={classnames("icon", className)}{...rest}>
      {props.name && <use xlinkHref={'#' + props.name} />}
    </svg>
  );
}

export default Icon;
