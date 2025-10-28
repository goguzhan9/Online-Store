import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(undefined);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload);
      if (!existing) {
        return state;
      }

      if (existing.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const subtotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return {
      items: state.items,
      subtotal,
      addToCart: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE_ITEM", payload: productId }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
