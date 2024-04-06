import { useEffect, useState } from "react";
import styled from "styled-components";

type Social = {
  profileImg: string;
  name: string;
};

const Wrapper = styled.aside`
  width: 25%;
  height: fit-content;
  margin-left: 20px;
`;

const Container = styled.aside`
  margin-bottom: 15px;
`;

const Title = styled.h1`
  padding: 10px 5px;
  color: slategray;
  font-weight: 600;
`;

const List = styled.ul`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`;

const Username = styled.span`
  font-weight: 600;
`;

const Option = styled.svg`
  width: 25px;
  color: slategray;
`;

const RequestItem = styled.ul`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Request = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Message = styled.p``;

const Requester = styled.span`
  font-weight: 600;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  &:first-child {
    background-color: #1877f2;
    color: white;
    &:hover {
      filter: brightness(1.1);
    }
  }
  &:last-child {
    border: 1px solid #e6e6e6;
    background-color: white;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export default function Social() {
  const [contacts, setContacts] = useState<Social[]>([]);
  const [requests, setRequests] = useState<Social[]>([]);

  const getContacts = async () => {
    try {
      const res = await fetch("/data/contact.json");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error;
    }
  };

  const getRequests = async () => {
    try {
      const res = await fetch("/data/request.json");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    getContacts();
    getRequests();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>CONTACTS</Title>
        <List>
          {contacts.map((contact, index) => (
            <Item key={index}>
              <UserInfo>
                <Profile src={contact.profileImg} />
                <Username>{contact.name}</Username>
              </UserInfo>
              <Option
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </Option>
            </Item>
          ))}
        </List>
      </Container>
      <Container>
        <Title>REQUESTS</Title>
        {requests.map((request, index) => (
          <RequestItem key={index}>
            <Request>
              <Profile src={request.profileImg} />
              <Message>
                <Requester>{request.name}</Requester> wants to add you to
                friends
              </Message>
            </Request>
            <Buttons>
              <Button>Accept</Button>
              <Button>Decline</Button>
            </Buttons>
          </RequestItem>
        ))}
      </Container>
    </Wrapper>
  );
}
