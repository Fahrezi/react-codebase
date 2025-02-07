import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Radio, Select, Textfield } from '@legion-ui/core';
import styles from './styles.module.css';

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["user", "admin"], {
    message: "Role is required"
  }),
  status: z.enum(["active", "inactive"], {
    message: "Status is required"
  }),
})

function UserForm() {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isValid, isDirty, defaultValues },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    }
  });

  const isDisabled = !isValid && !isDirty;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>  
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <Textfield
              padding='16px 0'
              label="Name"
              placeholder="Enter your name"
              name={name}
              type="text" 
              onChange={onChange}
              onBlur={() => {
                onBlur();
                trigger('name');
              }}
              message={errors?.name?.message as string}
              status={(errors?.name && touchedFields?.name) ? "error" : "normal"}
            />
          )}
        />
        <Controller 
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, name } }) => (
            <Textfield
              padding='16px 0'
              label='Email Address'
              placeholder='hello@mail.com'
              name={name}
              type='email'
              onChange={onChange}
              onBlur={() => {
                onBlur();
                trigger('email');
              }}
              message={errors?.email?.message as string}
              status={(errors?.email && touchedFields?.email) ? "error" : "normal"}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Role"
              onChange={(value) => onChange(value[0].value)}
              // defaultValue={[{ value: "user", label: "User" }]}
              message={errors?.role?.message as string}
              status={errors?.role ? "error" : "normal"}
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ]}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange } }) => (
            <div className={styles['radio-container']}>
              <h4>Status</h4>
              <div>
                <Radio
                  onChange={onChange}
                  label="Aktif"
                  name={name}
                  size="md"
                  value="active"
                  defaultChecked={defaultValues?.status === "active"}
                />
                <Radio
                  onChange={onChange}
                  label="Tidak Aktif"
                  name={name}
                  size="md"
                  value="inactive"
                  defaultChecked={defaultValues?.status === "inactive"}
                />
              </div>
            </div>
          )}
        />
      </div>
      <Button disabled={isDisabled} type="submit">Submit</Button>
    </form>
  )
}

export default UserForm