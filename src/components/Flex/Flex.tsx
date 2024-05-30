import { forwardRef } from 'react';

export const Flex = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div
    ref={ref}
    className={props.className}
    style={{
      display: props.container ? 'flex' : 'block',
      justifyContent: props.justifyContent || 'flex-start',
      flexDirection: props.flexDirection || 'row',
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || 'auto',
      flexShrink: props.flexShrink || 1,
      flexWrap: props.flexWrap || 'nowrap',
      flex: props.flex || '0 1 auto',
      alignItems: props.alignItems || 'stretch',
      margin: props.margin || '0',
      padding: props.padding || '0',
      width: props.width || 'auto',
      height: props.height || 'auto',
      maxWidth: props.maxWidth || 'none',
      gap: props.gap || 0,
      marginBottom: props.mb,
      ...props.style,
    }}
  >
    {props.children}
  </div>
));
