type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never;
type InferReturn<T> = T extends (...t: [...infer Arg]) => infer Res
  ? Res
  : never;
import { stores } from "app/provider/Provider";
export const checkAuth = <TFunc extends (...args: any[]) => any>(
  callback: TFunc
): ((...args: InferArgs<TFunc>) => InferReturn<TFunc>) => {
  return (...args: InferArgs<TFunc>) => {
    if (stores.authenticationStore.authFunc()) return callback(...args);
  };
};
