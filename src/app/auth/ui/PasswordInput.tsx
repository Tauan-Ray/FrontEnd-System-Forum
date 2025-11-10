import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PasswordInput({
  field,
  label,
  placeholder,
  show,
  toggle,
  disabled,
}: {
  field: any;
  label: string;
  placeholder: string;
  show: boolean;
  toggle: () => void;
  disabled: boolean;
}) {
  return (
    <FormItem>
      <FormLabel className="pl-3">{label}</FormLabel>
      <FormControl>
        <div className="relative w-full">
          <Input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            className="w-full pr-12 font-mono font-bold text-md"
            disabled={disabled}
            {...field}
          />

          <div
            onClick={toggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
          >
            {show ? (
              <EyeOffIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </div>
        </div>
      </FormControl>
    </FormItem>
  );
}
