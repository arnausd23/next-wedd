"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import Icon from "../../components/Puck/Icons/Icon";

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <>
      <Puck
        config={config}
        data={data}
        overrides={{
          componentItem: ({ children }) => {
            const componentType =
              children.props.children.props.children[0].props.children;

            return (
              <div
                className="m-3 flex gap-5 cursor-grab p-3 bg-white"
                style={{ border: "1px var(--puck-color-grey-8) solid" }}
              >
                <Icon type={componentType} />
                <div className="flex gap-2 items-center">
                  {children}
                  {/* <svg viewBox="0 0 20 20" width="12" fill="currentColor">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                  </svg> */}
                </div>
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
