import { useLayoutEffect, useRef, useState } from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import { DropdownList, DropdownListProps } from './DropdownList';

type TProps = {
  children: (data: {
    ref: any;
    setOpen: (open: boolean) => void;
  }) => React.ReactNode;
  dropdownListProps: DropdownListProps;
};

export const DropdownController = ({ children, dropdownListProps }: TProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const openRef = useRef(open);
  openRef.current = open;

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const handleClick = (event: any) => {
      if (openRef.current && !rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <Manager>
      <Reference>
        {({ ref }) => {
          const handleRef = (r: any) => {
            if (typeof ref === 'function') {
              ref(r);
            } else if (ref) {
              (ref as any).current = r;
            }

            rootRef.current = r;
          };
          return children({ ref: handleRef, setOpen });
        }}
      </Reference>

      {open && (
        <Popper
          placement="top-start"
          strategy="fixed"
          modifiers={[
            { name: 'preventOverflow', enabled: false },
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom'],
              },
            },
          ]}
        >
          {({ ref, style }) => {
            return (
              <DropdownList
                ref={ref}
                dropdownStyle="chat"
                {...dropdownListProps}
                style={{
                  ...style,
                  ...dropdownListProps.style,
                }}
              />
            );
          }}
        </Popper>
      )}
    </Manager>
  );
};
