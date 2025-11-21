package eu.consilium.core.util.mapper;

import eu.consilium.core.model.dto.ChatMessageDTO;
import eu.consilium.core.model.entity.ChatMessageEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ChatMapper {
    private final UserMapper userMapper;

    public ChatMessageDTO toDTO(ChatMessageEntity chatMessageEntity) {
        return ChatMessageDTO.builder()
                .id(chatMessageEntity.getId())
                .sender(userMapper.toDTO(chatMessageEntity.getSender()))
                .receiver(userMapper.toDTO(chatMessageEntity.getReceiver()))
                .content(chatMessageEntity.getContent())
                .timestamp(chatMessageEntity.getTimestamp())
                .build();
    }

    public ChatMessageEntity toEntity(ChatMessageDTO chatMessageDTO) {
        return ChatMessageEntity.builder()
                .id(chatMessageDTO.getId())
                .sender(userMapper.toEntity(chatMessageDTO.getSender()))
                .receiver(userMapper.toEntity(chatMessageDTO.getReceiver()))
                .content(chatMessageDTO.getContent())
                .timestamp(chatMessageDTO.getTimestamp() != null ? chatMessageDTO.getTimestamp() : LocalDateTime.now())
                .build();
    }

}
