import React from "react";
import "./LoadingSkeleton.scss";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="loading-skeleton" aria-label="loading-skeleton">
      <div className="loading-skeleton__title shimmer"></div>
      <div className="loading-skeleton__subtitle shimmer"></div>
      <div className="loading-skeleton__date shimmer"></div>
      <table className="loading-skeleton__table">
        <thead>
          <tr>
            <th className="loading-skeleton__header shimmer"></th>
            <th className="loading-skeleton__header shimmer"></th>
            <th className="loading-skeleton__header shimmer"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="loading-skeleton__cell shimmer"></td>
            <td className="loading-skeleton__cell shimmer"></td>
            <td className="loading-skeleton__cell shimmer"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoadingSkeleton;
