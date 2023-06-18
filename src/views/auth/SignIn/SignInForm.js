import React, { useState } from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const [userData, setUserData] = useState({ email: '', password: '' })

    const onSignIn = async (e) => {
        // const { userName, password } = values
        // const { email, password } = userData
        e.preventDefault()
        const email = userData?.email
        const password = userData?.password

        // setSubmitting(true)

        // const result = await signIn({ email, password })
        console.log(email)

        // if (result.status === 'failed') {
        //     setMessage(result.message)
        // }

        // setSubmitting(false)
    }

    return (
        <div className={className}>
            {/* {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )} */}
            <Formik

            // initialValues={{
            //     userName: 'admin',
            //     password: '123Qwe',
            //     rememberMe: true,
            // }}
            // validationSchema={validationSchema}
            // onSubmit={(values, { setSubmitting }) => {
            //     if (!disableSubmit) {
            //         onSignIn(values, setSubmitting)
            //     } else {
            //         setSubmitting(false)
            //     }
            // }}
            >
                {/* {({ touched, errors, isSubmitting }) => ( */}
                <Form onSubmit={onSignIn}>
                    <FormContainer>
                        <FormItem
                            label="User Name"
                            // invalid={errors.userName && touched.userName}
                            // errorMessage={errors.userName}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="email"
                                placeholder="User Name"
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value,
                                    })
                                }
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Password"
                            // invalid={errors.password && touched.password}
                            // errorMessage={errors.password}
                        >
                            <Field
                                autoComplete="off"
                                name="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value,
                                    })
                                }
                                component={PasswordInput}
                            />
                        </FormItem>
                        <div className="flex justify-between mb-6">
                            <Field
                                className="mb-0"
                                name="rememberMe"
                                component={Checkbox}
                                children="Remember Me"
                            />
                            <ActionLink to={forgotPasswordUrl}>
                                Forgot Password?
                            </ActionLink>
                        </div>
                        <Button
                            block
                            // loading={isSubmitting}
                            variant="solid"
                            type="submit"
                        >
                            Sign In
                        </Button>
                        <div className="mt-4 text-center">
                            <span>Don't have an account yet? </span>
                            <ActionLink to={signUpUrl}>Sign up</ActionLink>
                        </div>
                    </FormContainer>
                </Form>
                {/* )} */}
            </Formik>
        </div>
    )
}

export default SignInForm
