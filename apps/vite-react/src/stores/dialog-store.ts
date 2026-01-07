import { createStore } from "@/lib/store";

// 컴포넌트 타입에서 Props 타입 추출
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// 컴포넌트의 전체 Props 타입에서 onClose의 파라미터 타입 추출
export type InferDialogResult<TComponent extends React.ComponentType<any>> =
  ComponentProps<TComponent> extends { onClose(result: infer R): void }
    ? R
    : ComponentProps<TComponent> extends { onClose?: (result: infer R) => void }
      ? R
      : boolean; // 기본적으로 boolean (확인/취소 다이얼로그용)

export interface DialogState {
  component: React.ComponentType<any> | null;
  props: any;
  open: boolean;
  resolve: ((value: any) => void) | null;
  reject: ((reason?: any) => void) | null;
}

const initialState: DialogState = {
  component: null,
  props: {},
  open: false,
  resolve: null,
  reject: null,
};

export const dialogStore = createStore(initialState);

export function openDialog<TComponent extends React.ComponentType<any>>(
  component: TComponent,
  props: Omit<ComponentProps<TComponent>, "onClose" | "onCancel">,
): Promise<InferDialogResult<TComponent>> {
  return new Promise<InferDialogResult<TComponent>>((resolve, reject) => {
    dialogStore.setState({
      component,
      props,
      open: true,
      resolve: resolve as (value: any) => void,
      reject,
    });
  });
}

export function closeDialog(result?: any) {
  const state = dialogStore.getState();
  if (state.resolve) {
    state.resolve(result);
  }
  dialogStore.setState({
    component: null,
    props: {} as any,
    open: false,
    resolve: null,
    reject: null,
  });
}

export function cancelDialog(reason?: any) {
  const state = dialogStore.getState();
  if (state.reject) {
    state.reject(reason);
  }
  dialogStore.setState({
    component: null,
    props: {} as any,
    open: false,
    resolve: null,
    reject: null,
  });
}
