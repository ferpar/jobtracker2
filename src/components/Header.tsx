"use client";
import { signOut, signIn } from "next-auth/react";
import type { Session } from "next-auth";
import Image from "next/image";
import type { ImageLoaderProps } from "next/image";

type HeaderProps = {
  sessionData: Session | null;
};

const githubImageLoader = ({
  src,
}: ImageLoaderProps ): string => {
  return `${src}`;
};

export const Header = ({ sessionData }: HeaderProps) => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name
          ? `Notes for ${sessionData.user.name}`
          : "Welcome to Notetaker-T3"}
      </div>
      <div className="dropdown dropdown-end">
        {sessionData?.user ? (
          <label
            tabIndex={0}
            className="avatar btn btn-circle btn-ghost"
            onClick={() => void signOut()}
          >
            <div className="w-10 rounded-full">
              <Image
                loader={githubImageLoader}
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
                width="40"
                height="40"
              />
            </div>
          </label>
        ) : (
          <button
            className="btn btn-ghost rounded-btn"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
