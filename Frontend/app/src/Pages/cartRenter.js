import React, { useEffect } from 'react';
import { useHistory } from 'react-router-use-history'

function CartRenter() {
  const history = useHistory();

  useEffect(() => {
    history.push('/Cart');
  }, [history]);

  return <div>Loading...</div>;
}

export default CartRenter;