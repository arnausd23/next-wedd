// @ts-nocheck
"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import Icon from "../../components/Puck/Icons/Icon";
import { ComponentRename } from "../../components/Puck/services/ComponentRename";
import React from 'react'

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <>
      <Puck
        config={config}
        data={data}
        overrides={{
          fields: ({ children }) => {
            let elementsToRender = children;
            const exists = children.find((child) =>
              child.key.includes("Form-")
            );

            if (exists) {
              const newKeyToAdd = "Select options";
              children[0].props.value.map(({ inputType }) => {
                if (inputType === "select") {
                  elementsToRender[0].props.field.arrayFields[newKeyToAdd] = {
                    type: "array",
                    arrayFields: {
                      title: { type: "text" },
                    },
                  };
                } else {
                  delete elementsToRender[0].props.field.arrayFields[
                    newKeyToAdd
                  ];
                }
              });
            }
            return <div>{elementsToRender}</div>;
          },
          componentItem: ({ children }) => {
            const componentType =
              children?.props?.children.props.children[0].props.children;
            const componentName = ComponentRename(componentType);

            const newChildren = React.cloneElement(children, {
              children: React.cloneElement(children.props.children, {
                children: React.cloneElement(
                  children.props.children.props.children[0],
                  {
                    children: componentName,
                  }
                ),
              }),
            });
            
            return (
              <div
                className="m-3 flex gap-5 cursor-grab p-3 bg-white"
                style={{ border: "1px var(--puck-color-grey-8) solid" }}
              >
                <Icon type={componentType} />
                <div className="flex gap-2 items-center">{newChildren}</div>
              </div>
            );
          },
        }}
        onPublish={async (data: Data) => {
          await fetch("/puck/api", {
            method: "post",
            body: JSON.stringify({ data, path }),
          });

          toast.success("Data Saved", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}
